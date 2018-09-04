# -*- coding: utf-8 -*-
import scrapy
from chunyus.items import ChunyusItem

import re
import time


class ChunyuSpider(scrapy.Spider):
    name = 'chunyu'
    allowed_domains = ['chunyuyisheng.com']
    url = 'https://m.chunyuyisheng.com/m/hospitals/650000-0/?page='
    offset = 1
    start_urls = [url + str(offset)]

    def parse(self, response):
        links = response.xpath(
            "/html/body/main/section[1]/a/@href").extract()
        print(links)
        province = response.xpath(
            "/html/body/main/section[1]/a/p/text()").extract()
        rank = response.xpath(
            "/html/body/main/section[1]/a/h6/span/text()").extract()
        linklist = []
        for linkth in links:
            linklist.append("https://m.chunyuyisheng.com/"+linkth)
        # print(linklist[0])
        index = 0
        for link in linklist:
            linkth = link.replace("hospital", "hosintro")
            print(linkth)
            time.sleep(1)
            yield scrapy.Request(linkth, callback=self.parse_item, meta={'url': links, 'province': province, 'index': index, 'rank': rank})
            index = index+1

        if self.offset <= 25:
            self.offset += 1
            yield scrapy.Request(self.url + str(self.offset), callback=self.parse)

    def parse_item(self, response):
        # items = []
        item = ChunyusItem()
        indexs = response.meta['index']
        hospital = response.xpath("/html/body/main/h1/text()").extract()
        province = response.meta['province']
        city = response.meta['province']
        rank = response.meta['rank']
        introduce = response.xpath(
            "/html/body/main/section[1]/div/p/text()").extract()
        address = response.xpath(
            "/html/body/main/section[2]/p[1]/text()").extract()
        route = response.xpath(
            "/html/body/main/section[2]/p[2]/text()").extract()
        urlLink = response.meta['url']
        print(urlLink)
        # urlLink = response.xpath("@href").extract()
        tel = response.xpath("/html/body/main/section[3]/p/text()").extract()

        item['hospital'] = hospital[0].replace('介绍', '')
        # item['province'] = province[indexs].split("省")[0]+"省"
        # item['city'] = city[indexs].split("市")[0].split("省")[1]+"市"
        item['province'] = province[indexs].split("自治区")[0]+"自治区"
        item['city'] = city[indexs].split("市")[0]+"市"
        item['rank'] = rank[indexs]
        item['introduce'] = introduce[0].replace(
            '\r', '').replace('\n', '').replace('\t', '')
        item['address'] = address[0].replace('', '')

        if route:
            item['route'] = route[0].replace('暂无信息', '').replace('', '')
        else:
            item['route'] = ""
        item['urlLink'] = "https://m.chunyuyisheng.com/"+urlLink[indexs] or ""
        item['tel'] = tel[0].replace('暂无信息', '').replace('', '')

        # items.append(item)
        # return items
        # print(items)
        yield item
